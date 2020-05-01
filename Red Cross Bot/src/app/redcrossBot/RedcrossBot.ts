import { BotDeclaration, MessageExtensionDeclaration, PreventIframe } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import RedcrossMessageExtension from "../redcrossMessageExtension/RedcrossMessageExtension";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler } from "botbuilder";



// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for redcross Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)

export class RedcrossBot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    /** Local property for RedcrossMessageExtension */
    @MessageExtensionDeclaration("redcrossMessageExtension")
    private _redcrossMessageExtension: RedcrossMessageExtension;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();
        // Message extension RedcrossMessageExtension
        this._redcrossMessageExtension = new RedcrossMessageExtension();


        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);


    }


}
