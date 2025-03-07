import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Scripture } from '../types/scripture';
import { createScripture } from '../services/api';
import { AxiosError } from 'axios';

const Admin = () => {
  const toast = useToast();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const [formData, setFormData] = useState<Scripture>({
    week: 1,
    year: currentYear,
    reference: '',
    text: '',
    imageUrl: '',
    historicalContext: '',
    gospelTeaching: '',
    personalTestimony: '',
  });

  const handleChange = (field: keyof Scripture, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createScripture(formData);
      toast({
        title: 'Scripture saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Reset form
      setFormData({
        week: 1,
        year: currentYear,
        reference: '',
        text: '',
        imageUrl: '',
        historicalContext: '',
        gospelTeaching: '',
        personalTestimony: '',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast({
        title: 'Error saving scripture',
          description: error.response?.data?.error || 'Failed to save scripture',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error saving scripture',
          description: 'An unexpected error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW="container.md" py={{ base: 4, md: 10 }}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading color="scripture.blue">Add New Scripture</Heading>
        
        <HStack width="full" spacing={4}>
          <FormControl isRequired flex="1">
            <FormLabel>Week</FormLabel>
            <NumberInput
              min={1}
              max={52}
              value={formData.week}
              onChange={(_, value) => handleChange('week', value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired flex="1">
            <FormLabel>Year</FormLabel>
            <Select
              value={formData.year}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Reference</FormLabel>
          <Input
            value={formData.reference}
            onChange={(e) => handleChange('reference', e.target.value)}
            placeholder="e.g., 1 Nephi 3:7"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Scripture Text</FormLabel>
          <Textarea
            value={formData.text}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Enter the scripture text"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            placeholder="Enter the image URL"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Historical Context</FormLabel>
          <Textarea
            value={formData.historicalContext}
            onChange={(e) => handleChange('historicalContext', e.target.value)}
            placeholder="Enter the historical context"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Gospel Teaching</FormLabel>
          <Textarea
            value={formData.gospelTeaching}
            onChange={(e) => handleChange('gospelTeaching', e.target.value)}
            placeholder="Enter the gospel teaching"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Personal Testimony</FormLabel>
          <Textarea
            value={formData.personalTestimony}
            onChange={(e) => handleChange('personalTestimony', e.target.value)}
            placeholder="Enter your personal testimony"
            rows={4}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          bg="scripture.blue"
          _hover={{ bg: 'blue.600' }}
        >
          Save Scripture
        </Button>
      </VStack>
    </Container>
  );
};

export default Admin;