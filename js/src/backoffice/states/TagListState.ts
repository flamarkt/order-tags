import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import Tag from '../../common/models/Tag';

export default class TagListState extends AbstractListState<Tag> {
    type() {
        return 'flamarkt/order-tags';
    }
}
