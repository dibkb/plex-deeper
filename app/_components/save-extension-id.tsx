"use client";

import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, CopyIcon, CheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export const SaveExtensionId = () => {
  const [extensionId, setExtensionId] = useState("");

  const handleSaveExtensionId = () => {
    if (extensionId.trim()) {
      localStorage.setItem("QUERY_X_EXTENION_ID", extensionId.trim());
      toast.success("Extension ID saved successfully!");
      window.location.reload();
    } else {
      toast.error("Please enter a valid extension ID");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  return (
    <section className="p-4 flex flex-col gap-8 items-center justify-center h-full max-w-4xl mx-auto">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-zinc-200 mb-2">
          Query X Extension Setup
        </h3>
        <p className="text-zinc-400">
          Follow these steps to install and configure the Query X extension
        </p>
      </div>

      <div className="w-full space-y-6">
        {/* Installation Steps */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h4 className="text-xl font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <ExternalLinkIcon className="w-5 h-5" />
            Installation Steps
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                1
              </div>
              <div>
                <p className="text-zinc-200 font-medium">Clone and Install</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Clone the Query X extension repository and install
                  dependencies
                </p>
                <div className="mt-2 bg-zinc-900 rounded-lg p-3 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      git clone https://github.com/dibkb/query-x-extension
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(
                          "git clone https://github.com/dibkb/query-x-extension"
                        )
                      }
                      className="h-6 w-6 p-0"
                    >
                      <CopyIcon className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-zinc-300">
                      cd query-x-extension && pnpm install
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard("cd query-x-extension && pnpm install")
                      }
                      className="h-6 w-6 p-0"
                    >
                      <CopyIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                2
              </div>
              <div>
                <p className="text-zinc-200 font-medium">Build Extension</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Build the extension to create the dist folder
                </p>
                <div className="mt-2 bg-zinc-900 rounded-lg p-3 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">pnpm run build</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard("pnpm run build")}
                      className="h-6 w-6 p-0"
                    >
                      <CopyIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                3
              </div>
              <div>
                <p className="text-zinc-200 font-medium">Load in Chrome</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Open Chrome extensions and load the unpacked extension
                </p>
                <div className="mt-2 space-y-2">
                  <div className="bg-zinc-900 rounded-lg p-3">
                    <p className="text-zinc-300 text-sm">
                      1. Open Chrome and navigate to{" "}
                      <code className="bg-zinc-800 px-1 rounded">
                        chrome://extensions/
                      </code>
                    </p>
                    <p className="text-zinc-300 text-sm mt-1">
                      2. Enable "Developer mode" (toggle in top right)
                    </p>
                    <p className="text-zinc-300 text-sm mt-1">
                      3. Click "Load unpacked" and select the{" "}
                      <code className="bg-zinc-800 px-1 rounded">dist</code>{" "}
                      folder
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                4
              </div>
              <div>
                <p className="text-zinc-200 font-medium">Get Extension ID</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Copy the extension ID from the Chrome extensions page
                </p>
                <img
                  src="/extension-id.png"
                  alt="Extension ID"
                  className="h-40 object-cover rounded-lg mt-2"
                />
                <div className="mt-2 bg-zinc-900 rounded-lg p-3">
                  <p className="text-zinc-300 text-sm">
                    Look for the ID under your extension (e.g.,{" "}
                    <code className="bg-zinc-800 px-1 rounded">
                      lmahehkeleeobdljhkilajlgebegemfl
                    </code>
                    )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extension ID Input */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h4 className="text-xl font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            Configure Extension ID
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Extension ID
              </label>
              <div className="flex gap-3">
                <Input
                  value={extensionId}
                  onChange={(e) => setExtensionId(e.target.value)}
                  placeholder="Enter your extension ID (e.g., lmahehkeleeobdljhkilajlgebegemfl)"
                  className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-600"
                />
                <Button
                  onClick={handleSaveExtensionId}
                  disabled={!extensionId.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Save ID
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
