import { Button } from "@/components/ui/button";

export const VideoSubscriberButton = ({
    isSubscribed,
    onToggleSubscriptionButton,
}: {
    isSubscribed: boolean;
    onToggleSubscriptionButton: () => void;
}) => {
    return (
        <Button
            variant={isSubscribed ? "navActive" : "outline"}
            size="lg"
            className="gap-2 rounded-full"
            onClick={onToggleSubscriptionButton}
        >
            {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
    );
};
