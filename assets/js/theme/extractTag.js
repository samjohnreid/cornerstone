const postTypes = ['general', 'industry trend', 'installation', 'news', 'service'];

const extractTag = (tags) => {
    const postType = tags.find(tag => postTypes.includes(tag.name.toLowerCase()));
    return postType ? postType.name : '';
}

export { extractTag };