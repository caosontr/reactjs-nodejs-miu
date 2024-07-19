import { Container } from "@mui/material";
import Banner from "../components/client/Banner";
import Footer from "../components/client/Footer";
import Header from "../components/client/Header";
import ProductListHome from "../pages/clients/ProductListHome";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Container>
        
        <ProductListHome _id={""} name={""} image={""} category={""} price={0} brand={""} description={""}/>
      </Container>
      <Footer/>
    </div>
  );
}

export default HomePage;
