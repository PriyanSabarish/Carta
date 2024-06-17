import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        console.log(cookies.jwt);
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          console.log(data.status + " user");
          removeCookie("jwt");
          navigate("/login");
        } else console.log(data.user);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const Feature = () => {
    return (
      <div className="thegreatdappa">
        <div className="explore">
          <section className="rectangle-parent" id="rectangle-parent1">
            <div className="frame-child" />
            <div className="frame-wrapper">
              <div className="frame-parent">
                <div className="call-to-action-wrapper">
                  <div className="call-to-action">
                    <div className="revolutionize-patent-filing-container">
                    <p className="revolutionize-patent-filing">{`Enhance Your Patenting Process`}</p>
                      <p className="revolutionize-patent-filing">{`with AI Verification `}</p>


                    </div>
                    <div className="experience-the-future">
                      Our patent filing application utilizes blockchain technology and AI 
                      verification to streamline and secure the patenting process process. With our
                      innovative platform, you can confidently protect your intellectual property.
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <div className="button-labels">
                    <div className="button-labels-child" />
                    <button className="learn-more">Learn More</button>
                  </div>
                  <div className="button-labels1">
                    <div className="button-labels-item" />
                    <button className="sign-up">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-shape" />
          </section>
        </div>
      </div>
    );
  };

  
  const Explore = () => {
    return (
      <div className="thegreatdappa">
        <div className="explore">
          <section className="rectangle-parent">
            <div className="frame-child" />
            <div className="frame-wrapper">
              <div className="frame-parent">
                <div className="call-to-action-wrapper">
                  <div className="call-to-action">
                    <div className="revolutionize-patent-filing-container">
                      <p className="revolutionize-patent-filing">{`Revolutionize patent  `}</p>
                      <p className="revolutionize-patent-filing">{`filing with `}</p>

                      <p className="blockchain-and-ai">blockchain and AI</p>
                    </div>
                    <div className="experience-the-future">
                      Experience the future of patent filing with our
                      cutting-edge application powered by blockchain technology
                      and AI verification.
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <div className="button-labels">
                    <div className="button-labels-child" />
                    <button className="learn-more">Learn More</button>
                  </div>
                  <div className="button-labels1">
                    <div className="button-labels-item" />
                    <button className="sign-up">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-shape" />
          </section>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="thegreatdappa">
      <div className="mainhomedappa">
        <div className="explore-box1">
          <Explore />
        </div>
        <div className="nameless">
        <div className="explore-box1">
          <Feature />
        </div>
        </div>
      </div>
      </div>
    </>
  );
}
