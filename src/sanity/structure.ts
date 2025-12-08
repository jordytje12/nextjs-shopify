import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.listItem()
          .title('Homepage')
          .id('homepage-singleton')
          .icon(() => '🏠')
                .child(
                    S.document()
                        .schemaType('homepage')
                        .documentId('homepage'),
                ),
      S.listItem()
          .title('Header')
          .id('header-singleton')
          .icon(() => '🔧')
                .child(
                    S.document()
                        .schemaType('header')
                        .documentId('header'),
                ),
                S.listItem()
          .title('Footer')
          .id('footer-singleton')
          .icon(() => '⚓')
                .child(
                    S.document()
                        .schemaType('footer')
                        .documentId('footer'),
                ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'homepage', 'header', 'footer'].includes(item.getId()!),
      ),
    ])
