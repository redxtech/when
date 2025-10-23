{
  description =
    "A website that tells you when tv shows are coming out - to the second.";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems =
        [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];

      perSystem = { config, self', inputs', pkgs, system, ... }: {
        packages = {
          when = pkgs.buildNpmPackage {
            pname = "when";
            version = "0.0.0";

            src = ./.;

            npmDepsHash = "sha256-WRbvyRV/GFj1IrWY+zFcnzgm4KdKxTC/pXwR3D1D/2A=";

            installPhase = ''
              mkdir -p $out/share/when
              cp -r dist/* $out/share/when
            '';
          };

          default = self'.packages.when;
        };

        apps = {
          when = {
            type = "app";
            program = pkgs.writeShellApplication {
              name = "when";
              runtimeInputs = with pkgs; [ nodejs wrangler ];
              text = ''
                wrangler pages dev dist
              '';
            };
          };

          default = self'.apps.when;
        };

        devShells.default =
          pkgs.mkShell { packages = with pkgs; [ nodejs wrangler ]; };
      };
    };
}
