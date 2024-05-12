export default function () {
    const { status } = useAuth();
    return status.value === "authenticated";
}
