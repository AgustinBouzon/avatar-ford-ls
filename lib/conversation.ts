"use client";

export async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (error) {
    console.error("Microphone permission denied", error);
    return false;
  }
}

export async function getSignedUrl(): Promise<string> {
  const response = await fetch("/api/signed-url");
  if (!response.ok) {
    throw new Error("Failed to get signed url");
  }
  const data = await response.json();
  if (!data?.signedUrl) {
    throw new Error("signedUrl missing in response");
  }
  return data.signedUrl as string;
}
