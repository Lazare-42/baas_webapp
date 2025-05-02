import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast()

export function popupError(error: any, t: any) {
    if (error.response?.status === 500) {
        toast({
            title: 'Error',
            colorScheme: 'error',
            description: errorReadible(error.response.data, t),
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    } else if (error.response?.data?.error != null) {
        toast({
            title: 'Error',
            description:
                error.response.status + ' ' + error.response.data?.reason || '',
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    } else {
        toast({
            title: 'Error',
            description:
                'An unknown error occurred. Please contact a MeetingBaas administrator if the issue persists.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    }
}

export function errorReadible(error: string | undefined, t: any): string {
    switch (error) {
        case 'Unauthorized':
            return t('This user is not authorized.')
        case 'CannotLeavePersonalWorkspace':
            return t("You can't leave your personal workspace")
        case 'NotFound':
            return t('Account not found.')

        case 'Zip':
            return t(
                'Error generating the video. Please contact us via the chat.',
            )

        case 'UploadError':
            return t('Error while uploading the file. Please try again.')

        case 'NoSuchSession':
        case 'BadChunkIndex':
        case 'Nix':
        case 'ParseDuration':
            return t('Internal error while recording.')

        case 'NotATranscriptor':
            return t('Not a transcriptor')

        case 'NoAudio':
            return t('No audio available')

        case 'NotMasterCheckable':
            return t('Not master checkable')

        case 'AlreadyTranscribed':
            return t('Audio has already been transcribed')

        case 'AlreadyValidated':
            return t('This task has already been validated')

        case 'MailError':
            return t('Unable to send emails. Please contact support via chat.')

        case 'S3PutError':
            return t('Error from the file storage system.')

        case 'IoError':
            return t(
                'Database error. Please contact us via the chat should this persist.',
            )

        case 'Diesel':
            return t(
                'Database error. Please contact us via the chat should this persist.',
            )

        case 'FFmpegError':
            return t(
                'Error generating the video. Please contact us via the chat should this persist',
            )

        case 'TranscribeError':
            return t('Error from the transcription system.')

        case 'S3GetError':
            return t('Error from the file storage system.')

        case 'S3DeleteError':
            return t('Error from the file storage system.')

        case 'UnavailableLanguage':
            return t('This language is not available.')

        case 'ParsingAlignementFailed':
            return t('Alignment error')

        case 'LanguageToolError':
            return t('Automatic correction error')

        case 'SynchronizeFailed':
            return t('Synchronization error')

        case 'AccountAlreadyExist':
            return t('This account already exists.')

        case 'PostgresError':
            return t(
                'Database error. Please contact us via the chat should this persist.',
            )

        case 'CannotSendMail':
            return t(
                'Impossible to send e-mails. Please contact us via the chat.',
            )

        case 'PasswordNotSecure':
            return t('This password is not secure')

        case 'MailNotVerified':
            return t(
                'This account e-mail is not verified. Please click on the link sent via e-mail.',
            )

        case 'EmailVerifyTokenDoesntMatch':
            return t('Invalid activation link')

        case 'BcryptError':
            return t('Wrong password. Please try again, or reset it.')

        case 'InvalidLanguage':
            return t("Cette langue n'est pas valide")

        case 'BadPassword':
            return t('Wrong password. Please try again, or reset it.')

        case 'AccountNotFound':
            return t('No matching account found.')

        case 'AuthError':
            return t('Authentication error')

        case 'Stripe':
            return t(
                'Database error. Please contact us via the chat should this persist.',
            )

        case 'NoSubscription':
            return t('This account does not have a subscription.')

        case 'NoCustomer':
            return t('This account does not have a subscription')

        default:
            return `${t(
                'Unknown error. Please contact us via the chat should this persist.',
            )} ${error}`
    }
}
