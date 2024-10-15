import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = collection(db, 'gallery');
      try {
        const querySnapshot = await getDocs(imagesRef);
        const imageList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImages(imageList);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} p={4}>
      <Heading as="h1" size="2xl" mb={8}>Photo Gallery</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {images.map((image) => (
          <Box key={image.id} cursor="pointer" onClick={() => handleImageClick(image)}>
            <Image
              src={image.url}
              alt={image.title}
              borderRadius="md"
              objectFit="cover"
              width="100%"
              height="200px"
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Image
              src={selectedImage?.url}
              alt={selectedImage?.title}
              width="100%"
              height="auto"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Gallery;