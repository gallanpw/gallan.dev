<script>
    import { onMount, onDestroy } from 'svelte';
    import * as pdfjs from 'pdfjs-dist';

    // Svelte action untuk menyisipkan node DOM secara langsung
    function insertCanvas(node, canvasElement) {
        if (canvasElement && node) {
            // Pastikan node tidak memiliki child sebelum append, untuk menghindari duplikasi
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            node.appendChild(canvasElement);
            // Atur properti style di sini agar responsif
            canvasElement.style.display = 'block';
            canvasElement.style.width = '100%';
            canvasElement.style.height = 'auto';
        }
    }

    let pdfWorkerInitialized = false;

    export let fileUrl;
    export let maxWidth = 900;

    let containerRef;
    let pages = []; // Array untuk menyimpan { page, canvas, scale, renderTask }
    let currentPdfDoc = null;
    let resizeObserver = null;
    let errorMessage = '';

    function getScale(containerWidth) {
        if (!containerWidth) return 1;
        const defaultPdfWidth = 595;
        const scaleByWidth = containerWidth / defaultPdfWidth;
        return Math.min(scaleByWidth, maxWidth / defaultPdfWidth);
    }

    // Map untuk melacak renderTask aktif per halaman
    const activeRenderTasks = new Map();

    async function renderPage(page, canvas, scale) {
        // Batalkan renderTask yang sedang aktif untuk halaman ini (jika ada)
        if (activeRenderTasks.has(page.pageNumber)) {
            const previousRenderTask = activeRenderTasks.get(page.pageNumber);
            if (previousRenderTask && previousRenderTask.cancel) {
                previousRenderTask.cancel();
                // console.log(`Cancelled previous render task for page ${page.pageNumber}`);
            }
            activeRenderTasks.delete(page.pageNumber);
        }
        
        const viewport = page.getViewport({ scale: scale });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        context.clearRect(0, 0, canvas.width, canvas.height); // Selalu bersihkan kanvas

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        try {
            const renderTask = page.render(renderContext);
            activeRenderTasks.set(page.pageNumber, renderTask); // Simpan renderTask baru
            await renderTask.promise;
            activeRenderTasks.delete(page.pageNumber); // Hapus setelah selesai
        } catch (error) {
            // RenderingCancelledException adalah normal saat task dibatalkan
            if (error.name === 'RenderingCancelledException') {
                // console.warn(`Rendering for page ${page.pageNumber} cancelled.`);
            } else {
                console.error('Error rendering page:', error);
                context.fillStyle = 'red';
                context.fillText('Error rendering page', 10, 20);
                errorMessage = 'Failed to render a PDF page. See console for details.';
            }
        }
    }

    // Menggunakan variabel untuk melacak loading status dan mencegah multiple calls
    let isLoadingPdf = false;
    let lastLoadedFileUrl = null;

    async function loadAndRenderPdf(url, initialContainerWidth) {
        // Mencegah pemanggilan ulang jika sedang loading atau sudah memuat URL yang sama
        if (isLoadingPdf || url === lastLoadedFileUrl) {
            // console.log('Skipping load: already loading or same URL', { isLoadingPdf, url, lastLoadedFileUrl });
            return;
        }
        
        isLoadingPdf = true;
        errorMessage = '';

        // Hancurkan dokumen PDF sebelumnya dan batalkan semua renderTask
        if (currentPdfDoc) {
            // console.log('Destroying previous PDF document and cancelling tasks.');
            activeRenderTasks.forEach(task => task.cancel());
            activeRenderTasks.clear();
            currentPdfDoc.destroy();
            currentPdfDoc = null;
        }
        pages = [];

        // if (currentPdfDoc) {
        //     currentPdfDoc.destroy();
        //     currentPdfDoc = null;
        // }

        // if (!pdfWorkerInitialized) {
        //     console.warn("PDF.js worker not initialized yet. Skipping PDF load.");
        //     errorMessage = "Initializing PDF viewer...";
        //     isLoadingPdf = false;
        //     return;
        // }

        try {
            // console.log("Attempting to load PDF from:", url);
            const loadedPdf = await pdfjs.getDocument(url).promise; // Simpan hasil di variabel lokal
            // console.log("PDF loaded successfully. Number of pages:", loadedPdf.numPages);
            
            currentPdfDoc = loadedPdf; // Baru update state Svelte setelah berhasil
            lastLoadedFileUrl = url;
            
            const numPages = currentPdfDoc.numPages;

            const tempPages = [];
            for (let i = 1; i <= numPages; i++) {
                const page = await currentPdfDoc.getPage(i);
                const canvas = document.createElement('canvas'); // Buat elemen canvas
                const initialScale = getScale(initialContainerWidth || maxWidth);
                // Render awal tanpa menunggu, karena kita akan langsung memasukkan ke state pages
                // dan mungkin re-render jika resizeObserver memicu
                renderPage(page, canvas, initialScale); // Jangan pakai await di sini agar loop tidak blocking
                tempPages.push({ page, canvas }); // Tidak perlu menyimpan scale di sini
            }
            pages = tempPages; // Update reactive state once
        } catch (error) {
            console.error('Error loading PDF:', error);
            pages = [];
            errorMessage = `Failed to load resume: ${error.message}. Please try again later.`;
        } finally {
            isLoadingPdf = false;
        }
    }

    let resizeTimeout; // Variabel untuk menyimpan timer debounce

    async function reRenderAllPages(newContainerWidth) {
        if (!currentPdfDoc || !pages.length) return;

        // --- Tambahkan debounce di sini ---
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            const currentScale = getScale(newContainerWidth);
            for (let i = 0; i < pages.length; i++) {
                const { page, canvas } = pages[i];
                renderPage(page, canvas, currentScale);
            }
            resizeTimeout = null; // Reset timer
        }, 100); // Debounce 100ms. Sesuaikan nilai ini jika perlu.

        // const currentScale = getScale(newContainerWidth);
        // for (let i = 0; i < pages.length; i++) {
        //     const { page, canvas } = pages[i];
        //     // Langsung render ulang, ini akan membatalkan task sebelumnya jika ada
        //     renderPage(page, canvas, currentScale);
        // }
    }

    onMount(async () => {
        if (typeof window !== 'undefined') {
            try {
                // Gunakan CDN untuk workerSrc
                // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
                
                // Pastikan Anda telah menyalin node_modules/pdfjs-dist/build/pdf.worker.min.mjs
                // ke static/pdf-worker/pdf.worker.min.mjs
                pdfjs.GlobalWorkerOptions.workerSrc = `/pdf-worker/pdf.worker.min.mjs`;
                pdfWorkerInitialized = true;

                if ('ResizeObserver' in window) {
                    resizeObserver = new ResizeObserver(entries => {
                        const [entry] = entries;
                        if (entry && containerRef) {
                            // Panggil fungsi reRenderAllPages yang sudah di-debounce
                            reRenderAllPages(entry.contentRect.width);
                        }
                    });
                    if (containerRef) {
                        resizeObserver.observe(containerRef);
                    }
                } else {
                    console.warn("ResizeObserver not supported. PDF may not be responsive on this browser.");
                }

                setTimeout(() => {
                    loadAndRenderPdf(fileUrl, containerRef?.clientWidth);
                }, 100);

            } catch (error) {
                console.error("Error during PDF Viewer onMount initialization:", error);
                errorMessage = "Failed to initialize PDF viewer.";
            }
        }
    });

    // Handle perubahan fileUrl jika propnya berubah setelah mount
    // Tambahkan debounce untuk perubahan fileUrl yang cepat
    let fileUrlChangeTimeout;
    $: if (fileUrl && containerRef && pdfWorkerInitialized) {
        clearTimeout(fileUrlChangeTimeout);
        fileUrlChangeTimeout = setTimeout(() => {
            loadAndRenderPdf(fileUrl, containerRef.clientWidth);
        }, 150); // Tambahkan sedikit debounce
    }

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }

        if (resizeTimeout) { // Bersihkan timer saat destroy
            clearTimeout(resizeTimeout);
        }

        // Batalkan semua renderTask yang tersisa saat komponen dihancurkan
        activeRenderTasks.forEach(task => task.cancel());
        activeRenderTasks.clear();

        if (currentPdfDoc) { // Gunakan currentPdfDoc
            currentPdfDoc.destroy();
            currentPdfDoc = null;
        }
    });
</script>

<div class="pdf-viewer-container" bind:this={containerRef}>
    {#if errorMessage}
        <div class="error-message">
            <p>{errorMessage}</p>
            <p>Please check your browser console for more details.</p>
        </div>
    {:else if pages.length > 0}
        {#each pages as { canvas }, i (i)}
            <div class="pdf-page-wrapper">
                <div use:insertCanvas={canvas}></div>
            </div>
        {/each}
    {:else}
        <div class="loading-placeholder">
            <p>Loading resume...</p>
        </div>
    {/if}
</div>

<style>
    .pdf-viewer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: var(--max-width, 900px);
        margin: auto;
        min-height: 800px;
    }

    .pdf-page-wrapper {
        margin-bottom: 1rem;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }

    .loading-placeholder, .error-message {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        text-align: center;
        padding: 20px;
    }

    .error-message {
        color: red;
        border: 1px solid red;
        border-radius: 8px;
    }
</style>