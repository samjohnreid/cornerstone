import PageManager from './page-manager';
import { api } from '@bigcommerce/stencil-utils';

// ----------------------------------------------------------------------------------------------------

const options = {
    template: 'blog/blog-json'
};

const postTypes = ['general', 'industry trend', 'installation', 'news', 'service'];

// ----------------------------------------------------------------------------------------------------

const injectTag = () => {
    api.getPage(window.location.pathname, options, (error, response) => {
        if (error) return console.error(error);
        
        const postsJson = JSON.parse(response);
        const tag = postsJson.post.tags.find(tag => postTypes.includes(tag.name.toLowerCase()));
        const tagContainer = document.getElementById('blog-post-tag');

        tagContainer.innerText = tag.name;
    });
}

// ----------------------------------------------------------------------------------------------------

export default class Blog extends PageManager {
    onReady() {
        injectTag();
    }
}