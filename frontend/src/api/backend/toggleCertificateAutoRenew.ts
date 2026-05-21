import { post } from "./base";
import type { Certificate } from "./models";

export async function toggleCertificateAutoRenew(id: number, autoRenew: boolean): Promise<Certificate> {
	return post({
		url: `nginx/certificates/${id}/auto-renew`,
		data: { auto_renew: autoRenew },
	});
}
