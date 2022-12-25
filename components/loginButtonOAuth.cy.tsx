import { BsGoogle } from "react-icons/bs";
import LoginButtonOAuth from "./loginButtonOAuth";

describe('LoginButtonOAuth', () => {
    it('should mount', () => {
      cy.mount(<LoginButtonOAuth provider="Google" icon={<BsGoogle size={25} />} signInWithProvider={()=>{}}/>);
    });
  });