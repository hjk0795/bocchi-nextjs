import './commands'
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/globals.css'
import { mount } from 'cypress/react18'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      dataCy(value: string): Chainable<any>
    }
  }
}
Cypress.Commands.add('mount', mount);