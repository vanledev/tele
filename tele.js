import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";

const apiId = 24364635;
const apiHash = "c18b26fb82ec79ee298769959ab0ac92";
const session = new StringSession(
  "1BQANOTEuMTA4LjU2LjE1MgG7FoltiNlmPxpy5v+Cao4gEhSxpcvWiVPPlQzCdA4iLRNjGZD5XbTL2sDH5AlDR53TpxqaNFGrLWTMt0aYyJOKLCLwpG5JIckbaL3CPy9OrIGjqaPLeOZVvJuKtWkdXqCOF+gtjwfIifByHVWg59UuBgbi/Kmxs60tJCgDbDRNmujW6X2odLUslzOgWuCTWaeskhcBzz7E1x2hOG2uvu/Unl3H/MmeLF76/UIYwfNf4kTj73sJ3yBFUpiJfDADNEsh/1MVulc8ULRuOuR3WCrCEE/WEnUfIBIPdbU3MxtpbPQrGNJSPGD3/yR4QMRbstE6VOW35yvb4/ASyT4oDn35Qw=="
); // fill this later with the value from session.save()

// (async () => {
//   console.log("Loading interactive example...");
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//   await client.start({
//     phoneNumber: async () => await input.text("Please enter your number: "),
//     password: async () => await input.text("Please enter your password: "),
//     phoneCode: async () =>
//       await input.text("Please enter the code you received: "),
//     onError: (err) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.sendMessage("me", { message: "Hello!" });
// })();

const client = new TelegramClient(session, apiId, apiHash, {});

async function getMembers(groupID) {
  await client.connect(); // This assumes you have already authenticated with .start()
  let users = [];
  let offset = 0;
  let hasMoreUser = true;
  while (hasMoreUser) {
    const res = await client.invoke(
      new Api.channels.GetParticipants({
        channel: groupID,
        filter: new Api.ChannelParticipantsRecent({}),
        offset: offset,
        limit: 100,
      })
    );
    if (res.users.length == 0) {
      hasMoreUser = false;
      break;
    }
    users.push(...res.users);
    offset += 100;
  }

  const participants_ids = users.map((participant) => participant.id.value);
  return participants_ids;
}

export default getMembers;
