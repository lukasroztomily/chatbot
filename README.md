# chatbot

Chatbot obsahuje dva scenáře. První scenář umožnuje nastavit uživateli adresu. 
Druhý scenář na základě API generuje vtip.

## Adresa
Scenář začíná výrazem "adresa". Chatbot se ptá uživatele na připravené otázky, které
potřebuje k nastavení adresy. Chatbot v rámci interakce dává uživateli návod na validní 
odpověd. Jakmile uživatel zodpoví všechny otázky, scénář se úspěšně ukončí.
 
### Seznam otázek
Jméno
Město
Ulice
PSC

## Vtip
Scenář začíná výrazem "Ahoj". Chatbot zareaguje a zeptá se, jestli uživatel má zájem o vtip.
Uživatel vybírá mezi odpovědí "ANO", "NE". 

Pokud je zvolená odpověd "ANO", chatbot v pozadí se dotáže  API http://api.icndb.com/jokes/random. API odpoví náhodně vybraným  vtipem ve formátu JSON. Chatbot pak výsledek z API převede do správného formátu a zobrazí ho uživateli. Tím scenář úspěšně končí.

Pokud je zvolená odpověd "NE" chatbot se rozloučí a scenář úspěšně končí. 