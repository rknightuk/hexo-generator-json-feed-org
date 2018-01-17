var util = require('hexo-util');

hexo.extend.generator.register('json-feed', hexo_generator_json_feed);

function hexo_generator_json_feed(site) {
	var config, posts, rss, feedPath, siteAuthor;

	generateTags = function(post) {
    	return post.categories.length ? post.categories.map(function (cat) {
          return cat.name;
        }).join(',') : post.tags.map(function (tag) {
          return tag.name;
        }).join(',')
    }

	config = hexo.config.hasOwnProperty('jsonFeed') ? hexo.config.jsonFeed : {};

	feedPath = config.path ? config.path + '.json' : 'feed.json';

	posts = site.posts.sort('-date').filter(function (post) {
      return post.published;
    });

    if (config.limit) posts = posts.limit(0, config.limit);

    siteAuthor = {
		name: hexo.config.author,
		url: hexo.config.url
	}

	posts = posts.map(function (post) {
		return {
			id: post.permalink,
			url: post.permalink,
			external_url: post.link,
			title: post.title,
			link: post.permalink,
			summary: post.excerpt ? post.excerpt : '',
			image: post.image,
			banner_image: post.image,
			content_html: post.content,
			date_published: post.date.toDate().toISOString(),
			date_modified: post.updated.toDate().toISOString(),
			author: post.author ? {
				"name": post.author
			} : siteAuthor,
			tags: generateTags(post)
		};
    });

	feedContent = {
		version: 'https://jsonfeed.org/version/1',
		title: hexo.config.title,
		description: hexo.config.description,
		home_page_url: hexo.config.url,
		feed_url: hexo.config.url + '/' + feedPath,
		language: hexo.config.language,
		author: siteAuthor,
		items: posts
	};

	return {
		path: feedPath,
		data: JSON.stringify(feedContent)
	};
}
