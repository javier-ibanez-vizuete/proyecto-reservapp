import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { Accordion } from "../components/Accordion";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { Modal } from "../components/Modal/Modal";
import { Skeleton, SkeletonCard, SkeletonText } from "../components/Skeleton";
import { Spinner } from "../components/Spinner/Spinner";
import { Image } from "../components/UI/Image";
import { ImageContainer } from "../components/UI/ImageContainer";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { normalizeId } from "../helpers/normalizeId";
import { useDevice } from "../hooks/useDevice";
import { UserBookingsSection } from "../sections/UserBookingsSection";
import { UserDataSection } from "../sections/UserDataSection";
import { UserOrdersSection } from "../sections/UserOrdersSections";
import { AVATAR_DATA } from "../utils/AVATAR_DATA";

export const UserPage = () => {
    const [userProfile, setUserProfile] = useState({});
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const { user } = useContext(AuthContext);
    const { getProfile, patchUser, loadingUserMe } = useAuth();

    const { theme } = useContext(ThemeContext);
    const { isMobile, isTablet, isDesktop } = useDevice();

    const USER_DATA = [{ title: "USER DATA", content: <UserDataSection userData={userProfile} /> }];

    const BOOKINGS_DATA = [
        { title: "BOOKINGS", content: <UserBookingsSection userBookingsData={userProfile?.bookings} /> },
    ];

    const ORDERS_DATA = [
        { title: "ORDERS", content: <UserOrdersSection userOrdersData={userProfile?.orders} /> },
    ];

    const avatarClasses = classNames("rounded-full overflow-hidden", {
        "w-30": isMobile,
        "w-35": isTablet,
        "w-40": isDesktop,
    });

    const miniAvatarClasses = classNames("rounded-full overflow-hidden", {
        "w-16": isMobile,
        "w-22": isTablet,
        "w-24": isDesktop,
    });

    const handleGetMeUser = async () => {
        try {
            const fetchedUser = await getProfile();
            if (!fetchedUser) throw new Error("Not Fetched User");
            const fixedUserProfile = normalizeId(fetchedUser.user);
            if (!fixedUserProfile) throw new Error("Not posible to Normalize User Profile");

            setUserProfile(fixedUserProfile);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeAvatar = async (avatarData) => {
        if (avatarData.url === userProfile?.avatar?.url) return;
        setAvatarLoaded(false);
        try {
            const newData = { avatar: { url: avatarData.url, alt: avatarData.alt } };
            console.log("Que vale newData", newData);
            const updatedUser = await patchUser(newData);
            console.log("updatedUser", updatedUser);
        } catch (err) {
            console.error("Algo ha salido mal", err);
        } finally {
            console.log("Que vale ahora userProfile", userProfile);
            console.log("que vale user", user);
        }
    };

    const handleShowAvatarModal = () => {
        setShowAvatarModal((prev) => !prev);
    };

    useEffect(() => {
        handleGetMeUser();
    }, [user]);

    if (loadingUserMe.isLoading)
        return (
            <div className="flex flex-1 flex-col py-6">
                <Container className="flex-1 gap-5">
                    <div className="flex flex-col gap-3">
                        <SkeletonCard showAvatar={false} textLines={1} />
                        <Skeleton
                            variant="custom"
                            className={classNames("self-center rounded-full bg-gray-300 ", {
                                "w-[100px] h-[100px]": isMobile,
                                "w-[140px] h-[140px]": isTablet,
                                "w-[160px] h-[160px]": isDesktop,
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                    </div>
                </Container>
            </div>
        );

    if (!userProfile) return null;
    return (
        <div className="flex flex-1 flex-col">
            <Container className="gap-4">
                <Modal isOpen={showAvatarModal} onClose={handleShowAvatarModal} closeOnEscape={true}>
                    <ImageContainer>
                        <Image
                            imgSrc={userProfile?.avatar?.url}
                            alt={userProfile?.avatar?.alt}
                            className="rounded-lg"
                        />
                    </ImageContainer>
                </Modal>

                <div>
                    <h1>PROFILE</h1>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <div className="perfect-center rounded-full relative" onClick={handleShowAvatarModal}>
                        <ImageContainer className={avatarClasses}>
                            <Image
                                onLoad={() => setAvatarLoaded(true)}
                                imgSrc={userProfile?.avatar?.url}
                                alt={userProfile?.avatar?.alt}
                            />
                        </ImageContainer>
                        {!avatarLoaded && (
                            <>
                                <div className={`absolute inset-0 backdrop-blur-[2px] rounded-full`}></div>
                                <div className={`absolute inset-0 rounded-full perfect-center`}>
                                    <Spinner size="xl" />
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <Dropdown placement="bottom-center" offset={40}>
                            <DropdownTrigger
                                hasIcon={false}
                                btnStyle={false}
                                className={`${
                                    theme === "light" ? "btn-outline" : "btn-outline-dark"
                                } px-3 py-1.5`}
                            >
                                Cambiar Avatar
                            </DropdownTrigger>
                            <DropdownMenu direction="flex-row" className="mt-1 px-3" gap="gap-2">
                                {AVATAR_DATA.map((avatar) => (
                                    <ImageContainer
                                        key={avatar.url}
                                        className={miniAvatarClasses}
                                        onClick={() => handleChangeAvatar(avatar)}
                                    >
                                        <Image imgSrc={avatar.url} alt={avatar.alt} />
                                    </ImageContainer>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <Accordion
                        items={USER_DATA}
                        defaultOpen={false}
                        className={`rounded-lg ${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        }`}
                    />
                    <Accordion
                        items={BOOKINGS_DATA}
                        defaultOpen={false}
                        className={`rounded-lg ${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        }`}
                    />
                    <Accordion
                        items={ORDERS_DATA}
                        defaultOpen={false}
                        className={`rounded-lg ${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        }`}
                    />
                </div>
            </Container>
        </div>
    );
};
