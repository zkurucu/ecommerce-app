import { fetchProduct } from "../../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () => {
    fetchProduct(product_id);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        Add to basket
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>

      <Text as="h2" fontSize="2x1">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>

      <p>{data.description}</p>

      <Box margin="10">
        <ImageGallery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
