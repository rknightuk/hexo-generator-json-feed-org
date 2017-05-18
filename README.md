Modified version of [hexo-generator-json-feed](https://github.com/alexbruno/hexo-generator-json-feed) to meet the [JSON feed](https://jsonfeed.org/) specification.

# hexo-generator-json-feed-org
[Hexo](https://hexo.io/) plugin to generate a valid JSON feed (https://jsonfeed.org/)

## Installation and usage

```bash
npm i -S hexo-generator-json-feed-org
```

Hexo will run the generator automatically when you run `hexo serve` or `hexo generate`.

## Configuration

Add the following to your `_config.yml` file to customise the feed

```yaml
jsonFeed:
  limit: 25
  name: 'custom'
```

- `limit` - The amount of items shown in the feed, if this doesn't exists, all posts will be shown
- `name` - default: `feed`
