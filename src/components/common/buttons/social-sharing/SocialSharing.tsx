import {
    FaFacebookF,
    FaLinkedinIn,
    FaVk,
    FaTelegramPlane,
    FaTwitter,
    FaViber
} from 'react-icons/fa'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton,
    ViberShareButton
} from 'react-share'

const SocialSharing: React.FC<{ url: string }> = ({ url }) => {
    return (
        <div className="share-wrapper">
            <div className="btn-share bg-facebook">
                <FacebookShareButton url={url}>
                    <FaFacebookF />
                </FacebookShareButton>
            </div>
            <div className="btn-share bg-linkedin">
                <LinkedinShareButton url={url}>
                    <FaLinkedinIn />
                </LinkedinShareButton>
            </div>
            <div className="btn-share bg-telegram">
                <TelegramShareButton url={url}>
                    <FaTelegramPlane />
                </TelegramShareButton>
            </div>
            <div className="btn-share bg-twitter">
                <TwitterShareButton url={url}>
                    <FaTwitter />
                </TwitterShareButton>
            </div>
            <div className="btn-share bg-vk">
                <VKShareButton url={url}>
                    <FaVk />
                </VKShareButton>
            </div>
            <div className="btn-share bg-vk">
                <ViberShareButton url={url}>
                    <FaViber />
                </ViberShareButton>
            </div>
        </div>
    )
}

export default SocialSharing
