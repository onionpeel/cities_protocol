import {Link} from "react-router-dom";

const About = () => {
  return (
    <div>
      <div>
        This is the About page--rough draft
      </div>
      <div>
        What is the Ethereum Cities Protocol?
        It is a way to encourage people to participate in making Queretaro a better city.
      </div>
      <div>
        What makes Ethereum Cities Protocol unique?
        The Ethereum Cities Protocol is built with blockchain technology.  This allows you to interact with this app in a way that is private and secure.  You can become a registered user without ever having to provide any personal information about yourself.
      </div>
      <div>
        How does it work?
        The app is designed to let people create proposals that will improve Queretaro.  When a user gets validated, she or he can make up to five proposals. These proposals will be voted upon to decide which ones will be carried out.  In order to vote, a user must delegate their votes.  Votes can be delegated to oneself or to other users.  After a user makes five proposals, they need to have received one percent of all delegated votes in order make more proposals.
      </div>
      <div>
        Does each user get only vote?
        No, the number of votes is determined by how many Taro a user holds.  One Taro corresponds to one vote.
      </div>
      <div>
        What is Taro?
        Taro is the reward for using the Ethereum Cities Protocol.  They are tokens that are controlled by the user.  They represent a user's voting power.
      </div>
      <div>
        How do I get Taro?
        In order to get involved with the Ethereum Cities Protocol, you need to get an account on Ethereum and then validate your account with this app (don't worry, we will walk you through the process).  In order to validate, you need to take a quiz about Queretaro to show that you know the city and most likely live here.  If you pass the quiz, you will receive tokens based on the number of correct answers.  Then you can start earning more tokens by making proposals.
      </div>
      <div>
        Who can participate?
        The app is aimed for people who live in Queretaro, which is why participants must take a quiz about the city to get validated.
      </div>
      <div>
        How can I join?
        You will need to have MetaMask installed in your browser.  MetaMask is a browser extension that will give you access to the Ethereum blockchain.  Installation instructions can be found here:
      </div>
      <div>
        https://metamask.io/download.html
      </div>
      <div>
      Once you have Metamask installed, the Ethereum Cities Protocol will ask you to connect.  MetaMask will open a pop-up window and you will need to hit "confirm".
      </div>
      <div>
      Now that you are connected to the network, you need to get validated in the Ethereum Cities Protocol to show that you are familiar with Queretaro.  This is done by clicking on "How do I get Taro" or on the link below and then taking the quiz.  When you pass the quiz you will have some Taro tokens deposited into your account, and you can begin making proposals.
      </div>
      <div>
        <Link to="/quiz">Take the Queretaro quiz to get validated</Link>
      </div>
    </div>
  );
};

export default About;
