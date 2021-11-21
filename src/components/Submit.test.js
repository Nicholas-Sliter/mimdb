import { render, screen, fireEvent } from "@testing-library/react";
import Submit from "./Submit";

describe("Submit: Submiter tests", () => {
    let article;
    const handler = jest.fn();

    describe("Submit", () => {
        beforeEach(() => {
            film = {
                title: "sample",
                logLine: "LogLine of the sample film",
                release_date: "F21",
                duration: "90",
                courseId: "CSCI0312",
                vimeoId: "vimeoId",
                overview: "Overview of the sample film"
            };

            handler.mockReset();
        });

        // mock titles route
        fetchMock.get(`/api/film/sample`, (url) => {
            const section = url.charAt(url.length - 1);
            const currentArticles = data.filter(
                (article) => article.title.charAt(0) === section
            );

            return currentArticles.map((article) => ({
                title: article.title,
                id: article.id,
            }));
        });
    })




})