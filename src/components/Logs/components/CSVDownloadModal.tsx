import {
    Alert,
    AlertDescription,
    AlertIcon,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

interface CSVDownloadModalProps {
    isOpen: boolean
    onClose: () => void
    hasMoreRows: boolean
    onDownload: () => void
}

export const CSVDownloadModal = ({
    isOpen,
    onClose,
    hasMoreRows,
    onDownload,
}: CSVDownloadModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent bg="neutral.900" color="neutral.50" shadow="2xl">
            <ModalHeader borderBottom="1px solid" borderColor="neutral.700">
                Download CSV
            </ModalHeader>
            <ModalBody py={6}>
                <Alert
                    status={hasMoreRows ? 'warning' : 'info'}
                    bg={hasMoreRows ? 'warning.500' : 'primary.500'}
                    color="neutral.900"
                    rounded="md"
                >
                    <AlertIcon />
                    <AlertDescription>
                        {hasMoreRows
                            ? 'This will only export the currently loaded rows. To export all data, scroll down to load more rows first, or adjust your filters.'
                            : 'This will export all data matching your current filters.'}
                    </AlertDescription>
                </Alert>
            </ModalBody>
            <ModalFooter
                gap={3}
                borderTop="1px solid"
                borderColor="neutral.700"
            >
                <Button
                    variant="chartType"
                    isActive={false}
                    _hover={{ bg: 'primary.700' }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="chartType"
                    isActive={true}
                    onClick={onDownload}
                >
                    {hasMoreRows ? 'Download Loaded Rows' : 'Download All'}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
)
