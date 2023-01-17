import app from 'flamarkt/backoffice/backoffice/app';
import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import TagListState from '../states/TagListState';
import TagList from '../components/TagList';

export default class TagIndexPage extends Page {
    listState!: TagListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.listState = new TagListState();
        this.listState.refresh();
    }

    view() {
        return m('.OrderTagIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('orderTags.show', {
                        id: 'new',
                    }),
                }, 'New tag'),
            ]),
            m(TagList, {
                state: this.listState,
            }),
        ]));
    }
}
