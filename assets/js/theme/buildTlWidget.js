const buildTlWidget = (tlwContainer) => {
    const container = tlwContainer;
    const html = `
        <section class="tlw full-width">
            <div class="tlw__wrapper container">
                <div class="tlw__header">
                    <h2>SEE WHAT WE'RE UP TO</h2>
                    <a href="">SEE ALL ARTICLES</a>
                </div>
                <div class="tlw__posts-wrapper">
                    [ posts ]
                </div>
            </div>
        </section>
    `;
    container.innerHTML = html;
}

export { buildTlWidget };