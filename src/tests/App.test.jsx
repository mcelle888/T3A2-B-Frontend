import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, beforeEach } from "vitest"
import App from '../components/App'
import userEvent from "@testing-library/user-event"

describe('App Component', () => {
    let document

    beforeEach(() => {
        document = render(<App />).container
    })

    it('Renders Welcome component', () => {
        
        expect(document.querySelector('h1')).toHaveTextContent('We are Getting Married!')
    })

    it('Renders Home page when user inputs correct pincode', async () =>{
        

        await userEvent.click(screen.getByText('Login'))
        expect(document.querySelector('h1')).not.toBeNull()
        expect(document.querySelector('h1')).toHaveTextContent('Tim and Michelle')

    })
})