// components
import { IonHeader, IonContent, IonPage } from "@ionic/react";
import { withRouter } from "react-router-dom";
import Navbar from "../../components/Menubar/Navbar/Navbar";
import Footer from "../../components/Text/Footer/Footer";
// stylesheet
import "./Home.css";
const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent>
        {/* code html css */}
        <div className="home">
          <section id="hero">
            <div className="container text-center m-auto">
              <div className="row align-items-center p-5">
                <div className="col-xl-6 col-lg-12">
                  <h1>TimeSheet helps teams develop work forward.</h1>
                  <p>
                    Reduce costs, increase project visibility, and stay on
                    budget — get it all done with TimeSheet.
                  </p>
                  <form className="row my-5">
                    <div className="d-none d-md-block col-md-7 pr-md-2">
                      <input
                        name="email"
                        className="form-control w-100"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-5 pl-md-2">
                      <button
                        type="submit"
                        data-analytics-button="greenSignupHeroButton"
                        className="btn btn-wrap btn-primary btn-block px-4"
                      >
                        Sign up—free!
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-xl-6 col-lg-12 offset-lg-1 order-2 hero-image m-0 p-0">
                  <img src="assets/images/Online-Timesheet.png" height={576} />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
