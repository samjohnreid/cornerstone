import { extractTag } from './extractTag';
import { extractSummary } from './extractSummary';

const encodedEmail = '&#097;&#105;&#114;&#119;&#097;&#116;&#101;&#114;&#112;&#114;&#101;&#115;&#115;&#064;&#103;&#101;&#097;&#112;&#112;&#108;&#105;&#097;&#110;&#099;&#101;&#115;&#046;&#099;&#111;&#109;';

const buildFeatured4 = (posts, imgPaths) => {
    const tagsToExclude = ['news', 'spotlight-left', 'spotlight-center', 'spotlight-right', 'featured', 'hide'];
    const removeNewsAndSpotlights = (post) => {
        const postType = !post.tags.find(tag => tagsToExclude.includes(tag.name.toLowerCase()));
        return postType;
    }
    const latestBlogPosts = posts.filter(removeNewsAndSpotlights);
    const latestPosts = latestBlogPosts.slice(0,4).map((post) => {
        const postImg = imgPaths.find(item => item.alt === post.title);
        return `
            <div class="blog-feed__post">
                <a href="${post.url}" class="blog-feed__wrapper-link">
                    <div class="blog-feed__post-image">
                        ${postImg && postImg.outerHTML}
                    </div>
                    <div class="blog-feed__post-text">
                        <h3 class="blog-feed__tag">${extractTag(post.tags)}</h3>
                        <h2 class="blog-feed__title"  style="-webkit-box-orient: vertical">${post.title}</h2>
                        <p class="blog-feed__summary" style="-webkit-box-orient: vertical">${extractSummary(post.summary)}</p>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    const latestStoryPosts = posts.filter(post => post.tags.some(tag => tag.name === 'news'));
    const latestStories = latestStoryPosts.slice(0,5).map((post) => {
        const postImg = imgPaths.find(item => item.alt === post.title);
        return `
            <a href="${post.url}" class="blog-feed__wrapper-link">
                <div class="blog-feed__post">
                    <div class="blog-feed__post-text">
                        <h3 class="blog-feed__tag">${extractTag(post.tags)}</h3>
                        <h2 class="blog-feed__title" style="-webkit-box-orient: vertical">${post.title}</h2>
                    </div>
                    <div class="blog-feed__post-image">
                        ${postImg && postImg.outerHTML}
                    </div>
                </div>
            </a>
        `;
    }).join('');

    const container = document.getElementById('featured-4');
    const html = `
        <section class="blog-feed--featured-4">
            <div class="blog-feed__primary-container">
                ${latestPosts}
            </div>
            <div class="blog-feed__secondary-container">
                <h2>NEWS</h2>
                ${latestStories}
                <p>If you are a member of the media seeking information, please <a href="mailto:${encodedEmail}">email us</a>.</p>
            </div>
        </section>
    `;
    container.innerHTML = html;
}

export { buildFeatured4 };