<script lang="ts">
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "$lib/components/ui/dropdown-menu";
  import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { ChevronsDown, Menu } from "lucide-svelte";
  import GithubIcon from "$lib/icons/GithubIcon.svelte";
  import ToggleTheme from "$lib/components/ToggleTheme.svelte";

  interface RouteProps {
    href: string;
    label: string;
    external?: boolean; // true 表示走网关到外部服务
  }

  // 内部锚点 + 外部 Dashboard（挂在 /newpage/）
  const routeList: RouteProps[] = [
    { href: "#testimonials", label: "Testimonials" },
    { href: "#team",         label: "Team" },
    { href: "#contact",      label: "Contact" },
    { href: "#faq",          label: "FAQ" },
    { href: "/newpage/",     label: "Dashboard", external: true } // 关键：末尾斜杠 + external
  ];

  let isOpen = false;
</script>

<header class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md dark:shadow-dark shadow-light">
  <a href="/" class="font-bold text-lg flex items-center">
    <ChevronsDown class="bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
    ShadcnSvelte
  </a>

  <!-- Mobile -->
  <div class="flex items-center lg:hidden">
    <Sheet bind:open={isOpen}>
      <SheetTrigger>
        <Menu on:click={() => (isOpen = true)} class="cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
        <div>
          <SheetHeader class="mb-4 ml-4">
            <SheetTitle class="flex items-center">
              <a href="/" class="flex items-center">
                <ChevronsDown class="bg-gradient-to-tr from-primary/70 via-primary to-primary/70 rounded-lg size-9 mr-2 border text-white" />
                ShadcnSvelte
              </a>
            </SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-2">
            {#each routeList as { href, label, external }}
              {#if external}
                <!-- 外部服务：原生 <a> + rel="external" + data-sveltekit-reload -->
                <a
                  href={href}
                  rel="external"
                  data-sveltekit-reload
                  class={`${buttonVariants({ variant: "ghost", size: "default" })} justify-start text-base w-full`}
                  on:click={() => (isOpen = false)}
                >
                  {label}
                </a>
              {:else}
                <!-- 内部链接：正常锚点 -->
                <a
                  href={href}
                  class={`${buttonVariants({ variant: "ghost", size: "default" })} justify-start text-base w-full`}
                  on:click={() => (isOpen = false)}
                >
                  {label}
                </a>
              {/if}
            {/each}
          </div>
        </div>

        <SheetFooter class="flex-col sm:flex-col justify-start items-start">
          <Separator class="mb-2" />
          <ToggleTheme />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>

  <!-- Desktop -->
  <div class="hidden lg:flex items-center gap-1">
    <DropdownMenu>
      <DropdownMenuTrigger class={`${buttonVariants({ variant: "ghost", size: "default" })} text-base`}>
        Features
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[600px]">
        <div class="grid grid-cols-2 gap-5 p-4">
          <img
            src="https://github.com/sveltejs.png"
            alt="Svelte"
            class="h-full w-full rounded-md object-cover"
          />
          <ul class="flex flex-col gap-2">
            <!-- 可在此处填充 featureList -->
            <!--
            {#each featureList as { title, description }}
              <DropdownMenuItem class="rounded-md p-3 text-sm cursor-pointer">
                <div>
                  <p class="mb-1 font-semibold leading-none text-foreground">{title}</p>
                  <p class="line-clamp-2 text-muted-foreground">{description}</p>
                </div>
              </DropdownMenuItem>
            {/each}
            -->
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    {#each routeList as { href, label, external }}
      {#if external}
        <a
          href={href}
          rel="external"
          data-sveltekit-reload
          class={buttonVariants({ variant: "ghost", size: "default" })}
        >
          {label}
        </a>
      {:else}
        <a
          href={href}
          class={buttonVariants({ variant: "ghost", size: "default" })}
        >
          {label}
        </a>
      {/if}
    {/each}
  </div>

  <div class="hidden lg:flex">
    <ToggleTheme />
    <Button size="sm" variant="ghost" aria-label="View on GitHub">
      <a
        aria-label="View on GitHub"
        href="https://github.com/zxce3/shadcn-sveltekit-landing-page.git"
        target="_blank"
      >
        <GithubIcon class_="size-5" />
      </a>
    </Button>
  </div>
</header>

<style>
  .shadow-light { box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085); }
  .shadow-dark  { box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141); }
</style>
