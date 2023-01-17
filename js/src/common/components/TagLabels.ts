import Component from 'flarum/common/Component';
import Tag from '../models/Tag';
import TagLabel from './TagLabel';

export interface TagLabelsAttrs {
    orderTags?: Tag[]
}

export default class TagLabels extends Component<TagLabelsAttrs> {
    view() {
        return (this.attrs.orderTags || []).map(orderTag => orderTag ? m(TagLabel, {
            orderTag,
        }) : null);
    }
}
