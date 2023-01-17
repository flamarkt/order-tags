import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import Tag from '../models/Tag';

export interface TagLabelAttrs {
    // Don't call it "tag" to prevent any Mithril conflict
    orderTag: Tag
}

export default class TagLabel extends Component<TagLabelAttrs> {
    view() {
        const iconName = this.attrs.orderTag.icon();
        const color = this.attrs.orderTag.color();

        return m('span.FlamarktOrderTagLabel', color ? {
            className: 'colored',
            style: {
                '--tag-bg': color,
            },
        } : {}, [
            iconName ? [icon(iconName), ' '] : null,
            this.attrs.orderTag.name(),
        ]);
    }
}
