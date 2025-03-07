import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Card,
  CardBody,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { Scripture } from '../types/scripture';
import { getCurrentScripture } from '../services/api';

const Home = () => {
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScripture = async () => {
      try {
        const data = await getCurrentScripture();
        setScripture(data);
      } catch (err) {
        setError('Failed to load scripture');
        console.error('Error fetching scripture:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScripture();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md" py={{ base: 4, md: 10 }}>
        <Center h="50vh">
          <Spinner size="xl" color="scripture.blue" />
        </Center>
      </Container>
    );
  }

  if (error || !scripture) {
    return (
      <Container maxW="container.md" py={{ base: 4, md: 10 }}>
        <Center h="50vh">
          <Text color="red.500">{error || 'No scripture available'}</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container 
      maxW="container.md" 
      py={{ base: 4, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <VStack spacing={{ base: 5, md: 8 }} maxW="100%" alignItems="stretch">
        {/* Scripture Image */}
        <Box 
          width="full" 
          overflow="hidden" 
          borderRadius="16px" 
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
          position="relative"
          height={{ base: "200px", md: "400px" }}
        >
          <Image
            src={scripture.imageUrl}
            alt={scripture.reference}
            width="full"
            height="full"
            objectFit="cover"
          />
        </Box>

        {/* Scripture Reference and Text */}
        <Card width="full">
          <CardBody p={{ base: 5, md: 8 }}>
            <VStack spacing={{ base: 3, md: 4 }} align="center">
              <Heading 
                as="h2" 
                size={{ base: "lg", md: "xl" }} 
                color="scripture.blue"
                textAlign="center"
              >
                {scripture.reference}
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                textAlign="center" 
                fontStyle="italic"
                lineHeight="tall"
                color="gray.700"
                maxW="600px"
              >
                {scripture.text}
              </Text>
      </VStack>
          </CardBody>
        </Card>

        {/* Accordion Sections */}
        <Accordion allowMultiple width="full">
            <AccordionItem border="none" width="full">
              <h2>
              <AccordionButton 
                _expanded={{ bg: 'scripture.blue', color: 'white' }}
                borderRadius="12px"
                p={{ base: 4, md: 5 }}
              >
                <Box as="span" flex='1' textAlign='left'>
                  <Text fontWeight="600">Historical Context</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                {scripture.historicalContext}
              </Text>
            </AccordionPanel>
          </AccordionItem>

            <AccordionItem border="none" width="full">
            <h2>
              <AccordionButton 
                _expanded={{ bg: 'scripture.blue', color: 'white' }}
                borderRadius="12px"
                p={{ base: 4, md: 5 }}
              >
                <Box as="span" flex='1' textAlign='left'>
                  <Text fontWeight="600">Gospel Teaching</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                {scripture.gospelTeaching}
              </Text>
            </AccordionPanel>
          </AccordionItem>

            <AccordionItem border="none" width="full">
            <h2>
              <AccordionButton 
                _expanded={{ bg: 'scripture.blue', color: 'white' }}
                borderRadius="12px"
                p={{ base: 4, md: 5 }}
              >
                <Box as="span" flex='1' textAlign='left'>
                  <Text fontWeight="600">Personal Testimony</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                {scripture.personalTestimony}
              </Text>
              </AccordionPanel>
            </AccordionItem>
        </Accordion>
      </VStack>
    </Container>
  );
};
export default Home;
