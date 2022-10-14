import { api } from '@bigcommerce/stencil-utils';
import { extractTag } from './extractTag';
import { extractSummary } from './extractSummary';

const options = {
    template: 'blog/blog-json',
    config: {
        blog: {
            posts: {
                limit: 500,
                summary: 500
            },
        },
    },
};

const buildTlWidget = (tlwContainer) => {
    api.getPage('/articles/', options, (error, response) => {
        if (error) return console.error(error);

        const postsJson = JSON.parse(response);
        const posts = postsJson.posts.slice(0, 5);
        
        posts.forEach((post) => {
            const postUrl = post.url.replace('https://store-yefuun73xw.mybigcommerce.com/', '/');
            post.url = postUrl;

            const imgPath = post.thumbnail.data.replace('{:size}', '700w');
            post.thumbnail.data = imgPath;
        });

        const tlwPosts = posts.map((post, index) => {
            return `
                ${index === 0 ? `<div class="tlw__posts-primary">` : ``}
                ${index === 1 ? `</div><div class="tlw__posts-secondary">` : ``}
                <div class="tlw__post">
                    <a href="${post.url}" class="tlw__wrapper-link">
                        <div class="tlw__post-image">
                            <img src="${post.thumbnail.data}" alt="${post.title}" />
                        </div>
                        <div class="tlw__post-text">
                            <h3 class="tlw__tag">${extractTag(post.tags)}</h3>
                            <h2 class="tlw__title"  style="-webkit-box-orient: vertical">${post.title}</h2>
                            ${index === 0 ? `<p class="tlw__summary" style="-webkit-box-orient: vertical">${extractSummary(post.summary)}</p>` : ``}
                        </div>
                    </a>
                </div>
                ${index === posts.length ? `</div>` : ``}
            `;
        }).join('');
        
        const container = tlwContainer;
        const html = `
            <section class="tlw full-width">
                <div class="tlw__wrapper container">
                    <div class="tlw__header">
                        <h2>SEE WHAT WE'RE UP TO</h2>
                        <a href="/articles/">SEE ALL ARTICLES</a>
                    </div>
                    <div class="tlw__posts-wrapper">
                        ${tlwPosts}
                    </div>
                </div>
            </section>
        `;
        container.innerHTML = html;
    });
}

export { buildTlWidget };