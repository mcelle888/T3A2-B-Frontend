import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import App from '../components/App';
import userEvent from "@testing-library/user-event";

describe('App Component', () => {
    let document

    beforeEach(() => {
        document = render(<App />).container
    })

    it('Renders Welcome component', () => {
        expect(document.querySelector('h1')).toHaveTextContent('We are Getting Married!')
    })

    it('Renders error message if pincode is not inputted before logging in', async () => {
        await userEvent.click(screen.getByText('Login'))

        await waitFor(() => {
            expect(document.querySelector('p')).toHaveTextContent('Invalid pincode')
        })
    })
})
