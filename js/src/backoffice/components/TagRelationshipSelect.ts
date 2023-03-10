import app from 'flamarkt/backoffice/backoffice/app';
import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import highlight from 'flarum/common/helpers/highlight';
import icon from 'flarum/common/helpers/icon';
import Tag from '../../common/models/Tag';

export default class TagRelationshipSelect extends AbstractRelationshipSelect<Tag> {
    protected resultsCache = new Map<string, Tag[]>();

    search(query: string) {
        // No need to reload again and again when refocusing the field, resulsts are unlikely to change anyway
        if (this.resultsCache.has(query)) {
            return Promise.resolve();
        }

        // Intentionally load for an empty query as well
        // For all use cases where there are only <=5 tags there's no real need to filter
        return app.store
            .find<Tag[]>('flamarkt/order-tags', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.resultsCache.set(query, results);
                m.redraw();
            });
    }

    results(query: string) {
        // Technically our results for empty query don't come from the suggestion API
        // But we can conveniently reuse that attribute to make the dropdown disappear after selecting an option
        if (!query && !this.shouldShowSuggestions) {
            return [];
        }

        query = query.toLowerCase();

        const results = this.resultsCache.get(query);

        // Indicates still loading
        if (typeof results === 'undefined') {
            return null;
        }

        return (results || [])
            .concat(
                app.store
                    .all<Tag>('flamarkt-order-tags')
                    .filter(tag => tag.name().toLowerCase().substr(0, query.length) === query)
            )
            .filter((e, i, arr) => arr.lastIndexOf(e) === i)
            .sort((a, b) => a.name().localeCompare(b.name()));
    }

    item(tag: Tag, query?: string) {
        const iconName = tag.icon();

        return [
            iconName ? [icon(iconName), ' '] : null,
            query ? highlight(tag.name(), query) : tag.name(),
        ];
    }

    addModel(tag: Tag) {
        if (this.attrs.hasOne) {
            this.setValue([tag]);
        } else {
            // Remove any existing primary tag before adding an alternate one
            const tags = this.normalizedValue().filter(existingTag => {
                if (tag.isPrimary()) {
                    return !existingTag.isPrimary();
                }

                return true;
            });

            tags.push(tag);

            this.setValue(tags);
        }
    }
}
