module.exports = {
    block: 'documentation',
    content: [
        {
            block: 'paragraph',
            content: [
                {
                    block: 'link',
                    content: 'foo',
                    href: 'http://example.com',
                    title: 'Example Domain'
                },
                ', ',
                {
                    block: 'link',
                    content: 'foo',
                    href: 'http://example.com',
                    title: 'Example Domain'
                },
                ', ',
                {
                    block: 'link',
                    content: 'bar',
                    href: 'http://example.com',
                    title: 'Example Domain'
                },
                '.'
            ]
        },
        {
            block: 'paragraph',
            content: [
                {
                    alt: 'foo',
                    block: 'image',
                    title: 'Example Domain',
                    url: 'http://example.com'
                },
                ', ',
                {
                    alt: 'foo',
                    block: 'image',
                    title: 'Example Domain',
                    url: 'http://example.com'
                },
                ', ',
                {
                    alt: 'bar',
                    block: 'image',
                    title: 'Example Domain',
                    url: 'http://example.com'
                },
                '.'
            ]
        }
    ]
};
