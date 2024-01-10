# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**


Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance


## Answer:
1. How does the client ensure that their data has not been tampered with?
The client can ensure data integrity by using the verifyData function, which sends a request to the server to verify the data. Here's how it works:

The client application sends the data to the server (via the /verify endpoint).
The server calculates the hash of the received data and compares it with the stored hash that was calculated when the data was last updated (stored in the server's database).
If the hashes match, it means the data has not been tampered with. The server then responds to the client confirming the data's integrity.
If the hashes do not match, it indicates the data may have been altered, and the server informs the client that the data may be compromised.
This method relies on the principle that even minor changes in the data will result in a significantly different hash, making it easy to detect alterations.

2. If the data has been tampered with, how can the client recover the lost data?
To recover lost or tampered data, the application needs a mechanism to revert to a previous, untampered state. This can be achieved in several ways:

Version Control: Implement version control in the database. Every time data is updated, save a new version rather than overwriting the existing data. In case of tampering, we can revert to a previous version.
Backups: Regularly backup the database. If tampering is detected, we can restore data from a backup made before the tampering occurred.
Audit Logs: Maintain audit logs that record every change made to the data. If tampering is detected, these logs can help identify what was changed and potentially restore the original data.
These recovery methods should be implemented on the server side. The client can request a data recovery (perhaps through a specific server endpoint), but the actual recovery process (version rollback, backup restoration, etc.) is handled server-side.