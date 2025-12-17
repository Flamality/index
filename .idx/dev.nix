{ pkgs, ... }:
{
  # channel = "stable-23.11";  # or "unstable" if you're bold
  channel = "unstable";
  packages = [ pkgs.nodejs_22 ];  # grab the version you actually need

  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [ "npm" "run" "vite:start" "--" "--host" "0.0.0.0" "--port" "$PORT" ];
        manager = "web";
        env = {
          VITE_DEV_KEY="3d35226138407dd18b2975f4b7cfe81eeace126a376070a4bca37c813678f20e51895250a3ff4f879764dffb8de092967f43c9a6c5062b183997502fad587a8b1775bcf2615ce568ab1bfd377e33d9bfdf485aa275f4f43ab7b6148a6978613ce38e716faced18fda355dbfa43a6f86f2889c6afe0ce4cc5fd49466970af993d";
          VITE_API_URL="https://nyc.cloud.appwrite.io/v1";
          VITE_SPOTIFY_CLIENT_ID="4b9c7d2f60ae4267a42d0e68db606675";
          PORT="3000";
          VITE_SPOTIFY_CLIENT_SECRET="c0ba6d66c64745a1a164af44dd0eabfd";
          VITE_APPWRITE_ID="flamality";

        };
        # cwd = "../";
      };
    };
  };
}
