import Component from 'flarum/common/Component';
import Tag from '../models/Tag';

export interface TagLabelAttrs {
    // Don't call it "tag" to prevent any Mithril conflict
    orderTag: Tag
}

export default class TagLabel extends Component<TagLabelAttrs> {
    view() {
        return this.attrs.orderTag.name();
    }
}
