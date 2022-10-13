import { api } from '@bigcommerce/stencil-utils';
import { extractTag } from './extractTag';

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

        const tlwPosts = posts.map((post) => {
            return `
                <li>
                    <a href="${post.url}">
                        <div><img src="${post.thumbnail.data}" /></div>
                        <div>${extractTag(post.tags)}</div>
                        <div>${post.title}</div>
                    </a>
                </li>
            `;
        }).join('');
        
        const container = tlwContainer;
        const html = `
            <section class="tlw full-width">
                <div class="tlw__wrapper container">
                    <div class="tlw__header">
                        <h2>SEE WHAT WE'RE UP TO</h2>
                        <a href="">SEE ALL ARTICLES</a>
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