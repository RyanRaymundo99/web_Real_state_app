import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button, Container } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner= ({ purpose, title1, title2, desc1, desc2, buttonText, LinkName, imageUrl}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="2">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box padding={5}>
    <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl'>
        <Link href={LinkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {

    const outerBoxStyles = {
      width: '1300px',
      height: '600px',
      background:
      'url(https://images.alphacoders.com/435/435117.jpg)',
    }
  
    const innerBoxStyles = {
      alignItems: 'center',
      textAlign: 'center',
      width: '1300px',
      height: '600px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '20px',
    }

  return (
    <box >

      <Flex
        paddingTop="10px"
        flexWrap='wrap'
        spacing='24px'
        gap='16px'
        width="650px"
      >
        <Box sx={outerBoxStyles}>
          <Box sx={innerBoxStyles} backdropFilter='auto' backdropContrast='30%'>
            Box with Backdrop Contrast
          </Box>
        </Box>
      </Flex>

      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for,Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        LinkName="/search?purpose=for-sale"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>

      <Banner
        purpose="Buy A HOME"
        title1="Rental Homes for,Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        LinkName="/search?purpose=for-rent"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap="wrap">
      {propertiesForSale.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
    </box>
  )
}


export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}