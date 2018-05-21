function mySettings(props) {
  return (
    <Page>
         <Select
            label="Theme"
            settingsKey="theme"
            options={[
               {
                 name: "Pink",
                 value: {
                   background: "#FFB6C1",
                   foreground: "#FFB6C1"
                 }
               },
               {
                 name: "Plum",
                 value: {
                   background: "#DDA0DD",
                   foreground: "#DDA0DD"
                 }
               },
               {
                 name: "Cerulean",
                 value: {
                   background: "#7898f8",
                   foreground: "#7898f8"
                 }
               },
               {
                 name: "Slate",
                 value: {
                   background: "#7090b5",
                   foreground: "#7090b5"
                 }
               },
               {
                 name: "Palevioletred	",
                 value: {
                   background: "#DB7093",
                   foreground: "#DB7093"
                 }
               },
               {
                 name: "Green",
                 value: {
                   background: "#6B8E23",
                   foreground: "#6B8E23"
                 }
               },
               {
                 name: "Black",
                 value: {
                   background: "#000000",
                   foreground: "#FFFFFF"
                 }
               }]
            }
          />
    </Page>
  );
}

registerSettingsPage(mySettings);
