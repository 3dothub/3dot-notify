import React, { memo, useEffect, useState, MouseEvent } from "react";
import { CloseButton, NotifyContainer, NotifyIsland } from "./Notify.style";
import { MdCancel } from "react-icons/md";

interface State {
    expandNotify: boolean;
    displayNotify: boolean;
}

const Notify: React.FC = () => {
    const [state, setState] = useState<State>({
        expandNotify: false,
        displayNotify: false,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setState((prevState) => ({ ...prevState, displayNotify: true }));
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleNotify = () => {
        setState((prevState) => ({
            ...prevState,
            expandNotify: !prevState.expandNotify,
        }));
    };

    const handleClose = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            expandNotify: false,
            displayNotify: false,
        }));
    };

    return (
        <NotifyContainer>
            <NotifyIsland
                displayNotify={state.displayNotify}
                expandNotify={state.expandNotify}
                onClick={handleNotify}
            >
                {!state.expandNotify ? (
                    <>
                        1 Notification
                    </>
                ) : (
                    <>
                        <span>Response 200 successfully fetched</span>
                        <CloseButton onClick={handleClose}>
                            <MdCancel />
                        </CloseButton>
                    </>
                )}
            </NotifyIsland>
        </NotifyContainer>
    );
};

export default memo(Notify);
