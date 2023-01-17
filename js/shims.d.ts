import OrderShowPage from 'flamarkt/core/backoffice/pages/OrderShowPage';
import Tag from './src/common/models/Tag';

declare module 'flamarkt/core/backoffice/pages/OrderShowPage' {
    export default interface ProductShowPage {
        tags: Tag[]
    }
}

declare module 'flamarkt/core/common/models/Order' {
    export default interface Order {
        tags: () => false | (Tag | undefined)[]
    }
}
