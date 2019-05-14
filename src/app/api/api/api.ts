export * from './auth.service';
import { AuthService } from './auth.service';
export * from './topGenerator.service';
import { TopGeneratorService } from './topGenerator.service';
export const APIS = [AuthService, TopGeneratorService];
