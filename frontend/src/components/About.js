import {Link} from "react-router-dom";

const About = () => {
  return (
    <div>
      <div>
        This is the About page
      </div>
      <div>
        this page will 1. describe what TARO is, 2. explain the proposal system 3. walk users through the process of getting metamask, connecting to metamask and getting validated

        the link to install metamask
        https://metamask.io/download.html

        <div>
        The last step for the user to begin earning TARO is to validate their account.  This is done by taking a quiz about Queretaro.  This helps to keep the TARO tokens among people who care about their city.
        </div>

        <Link to="/quiz">Take the Queretaro quiz</Link>
      </div>
    </div>
  );
};

export default About;
