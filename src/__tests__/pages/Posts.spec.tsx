import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { CreatePrismicClient } from "../../services/prismic";
const products = [
    {
        id: "01",
        title: "Post 01",
        summary: "Post 01 Summary",
        updateAt: "23 de Outubro de 2021"
    },
    {
        id: "02",
        title: "Post 02",
        summary: "Post 02 Summary",
        updateAt: "23 de Outubro de 2021"
    }
]

jest.mock("../../services/prismic");

describe("Posts Page", () => {
    test("should render correctly", async () => {
        render(<Posts posts={products} />);

        expect(await screen.findByText("Post 01")).toBeInTheDocument();
        expect(await screen.findByText("Post 02")).toBeInTheDocument();
    });

    test("should return GetStaticProps correctly", async () => {
        const primicMock = mocked(CreatePrismicClient);
        const primicQueryFnMock = jest.fn().mockResolvedValueOnce({
            results: [
                {
                    uid: "01",
                    last_publication_date: "10-23-2021",
                    data: {
                        title: [{type: "heading", text: "Post 01 Heading"}],
                        content: [{type: "paragraph", text: "Post 01 Paragraph"}],
                    }
                },
                {
                    uid: "02",
                    last_publication_date: "10-22-2021",
                    data: {
                        title: [{type: "heading", text: "Post 02 Heading"}],
                        content: [{type: "paragraph", text: "Post 02 Paragraph"}],
                    }
                }
            ]
        })
        primicMock.mockReturnValueOnce({
            query: primicQueryFnMock
        } as any);
        const response = await getStaticProps({});
        expect(primicQueryFnMock).toBeCalledTimes(1);
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [
                        {
                            id: "01",
                            title: "Post 01 Heading",
                            summary: "Post 01 Paragraph",
                            updateAt: "23 de outubro de 2021",
                        },
                        {
                            id: "02",
                            title: "Post 02 Heading",
                            summary: "Post 02 Paragraph",
                            updateAt: "22 de outubro de 2021",
                        }
                    ]
                },
            })
        )
    })
})